from models import db, User, Message, Follows
from unittest import TestCase
import os


os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

CURR_USER_KEY = "curr_user"

db.create_all()

class MessageModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.client = app.test_client()

    def test_view_follower_following_logged_in(self):
        """When logged in, can you see the follower/following pages for any user?"""

        # Create test users
        user1 = User.signup("user1", "user1@test.com", "password", None)
        user2 = User.signup("user2", "user2@test.com", "password", None)
        db.session.add_all([user1, user2])
        db.session.commit()

        # Login as user1
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user1.id

            # Access follower/following pages for user2
            response_followers = c.get(f"/users/{user2.id}/followers")
            response_following = c.get(f"/users/{user2.id}/following")

            # Assert that pages are accessible
            self.assertEqual(response_followers.status_code, 200)
            self.assertEqual(response_following.status_code, 200)

    def test_view_follower_following_logged_out(self):
        """When logged out, are you disallowed from visiting a user’s follower/following pages?"""

        # Create a test user
        user = User.signup("testuser", "test@test.com", "password", None)
        db.session.add(user)
        db.session.commit()

        # Access follower/following pages while logged out
        response_followers = self.client.get(f"/users/{user.id}/followers")
        response_following = self.client.get(f"/users/{user.id}/following")

        # Assert that access is denied (redirected to login)
        self.assertEqual(response_followers.status_code, 302)  # Redirect
        self.assertEqual(response_following.status_code, 302)  # Redirect

    def test_add_message_logged_in(self):
        """When logged in, can you add a message as yourself?"""

        # Create a test user
        user = User.signup("testuser", "test@test.com", "password", None)
        db.session.add(user)
        db.session.commit()

        # Login as the test user
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id

            # Add a message
            c.post("/messages/new", data={"text": "Test message"})

            # Retrieve the user's messages
            user_messages = Message.query.filter_by(user_id=user.id).all()

            # Assert that the message is added
            self.assertEqual(len(user_messages), 1)
            self.assertEqual(user_messages[0].text, "Test message")

    def test_delete_message_logged_in(self):
        """When logged in, can you delete a message as yourself?"""

        # Create a test user and message
        user = User.signup("testuser", "test@test.com", "password", None)
        message = Message(text="Test message", user_id=user.id)
        db.session.add_all([user, message])
        db.session.commit()

        # Login as the test user
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id

            # Delete the message
            c.post(f"/messages/{message.id}/delete")

            # Retrieve the user's messages
            user_messages = Message.query.filter_by(user_id=user.id).all()

            # Assert that the message is deleted
            self.assertEqual(len(user_messages), 0)

    def test_add_message_logged_out(self):
        """When logged out, are you prohibited from adding messages?"""

        # Attempt to add a message while logged out
        response = self.client.post("/messages/new", data={"text": "Test message"})

        # Assert that access is denied (redirected to login)
        self.assertEqual(response.status_code, 302)  # Redirect

    def test_delete_message_logged_out(self):
        """When logged out, are you prohibited from deleting messages?"""

        # Create a test user and message
        user = User.signup("testuser", "test@test.com", "password", None)
        message = Message(text="Test message", user_id=user.id)
        db.session.add_all([user, message])
        db.session.commit()

        # Attempt to delete the message while logged out
        response = self.client.post(f"/messages/{message.id}/delete")

        # Assert that access is denied (redirected to login)
        self.assertEqual(response.status_code, 302)  # Redirect

    def test_add_message_as_another_user(self):
        """When logged in, are you prohibited from adding a message as another user?"""

        # Create test users
        user1 = User.signup("user1", "user1@test.com", "password", None)
        user2 = User.signup("user2", "user2@test.com", "password", None)
        db.session.add_all([user1, user2])
        db.session.commit()

        # Login as user1
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user1.id

            # Attempt to add a message as user2
            response = c.post(f"/messages/new", data={"text": "Test message from user2"})

            # Assert that access is denied (403 Forbidden or similar)
            self.assertEqual(response.status_code, 403)  # Forbidden

    def test_delete_message_as_another_user(self):
        """When logged in, are you prohibited from deleting a message as another user?"""

        # Create test users and a message
        user1 = User.signup("user1", "user1@test.com", "password", None)
        user2 = User.signup("user2", "user2@test.com", "password", None)
        message = Message(text="Test message", user_id=user2.id)
        db.session.add_all([user1, user2, message])
        db.session.commit()

        # Login as user1
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user1.id

            # Attempt to delete user2's message
            response = c.post(f"/messages/{message.id}/delete")

            # Assert that access is denied (403 Forbidden or similar)
            self.assertEqual(response.status_code, 403)  # Forbidden
