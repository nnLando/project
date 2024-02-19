"""User model tests."""

import os
from unittest import TestCase
from models import db, User, Message, Follows

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

# Now we can import app
from app import app

# Create our tables
db.create_all()

class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.client = app.test_client()

        # Create a test user
        self.user = User.signup(
            username="testuser",
            email="test@test.com",
            password="testuser",
            image_url=None
        )
        db.session.commit()

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_user_model(self):
        """Does basic model work?"""

        # Does the __repr__ method work?
        self.assertEqual(repr(self.user), f"<User #{self.user.id}: {self.user.username}, {self.user.email}>")

        # Test is_following method
        self.assertFalse(self.user.is_following(self.user))  # User is not following itself initially

        # Test is_followed_by method
        self.assertFalse(self.user.is_followed_by(self.user))  # User is not followed by itself initially

        # Test signup method
        new_user = User.signup(
            username="newuser",
            email="new@test.com",
            password="newuser",
            image_url=None
        )
        db.session.commit()
        self.assertEqual(new_user.username, "newuser")
        self.assertEqual(new_user.email, "new@test.com")

        # Test signup method with existing username
        with self.assertRaises(ValueError):
            User.signup(
                username="testuser",  # Existing username
                email="test2@test.com",
                password="testuser2",
                image_url=None
            )

        # Test authenticate method
        authenticated_user = User.authenticate("testuser", "testuser")
        self.assertEqual(authenticated_user, self.user)

        # Test authenticate method with invalid username
        invalid_user = User.authenticate("invalidusername", "testuser")
        self.assertFalse(invalid_user)

        # Test authenticate method with invalid password
        invalid_password = User.authenticate("testuser", "invalidpassword")
        self.assertFalse(invalid_password)


if __name__ == '__main__':
    import unittest
    unittest.main()
