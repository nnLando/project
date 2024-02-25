from flask import Flask, redirect, render_template,request,url_for, Response
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Playlist, Song, PlaylistSong
from forms import NewSongForPlaylistForm, SongForm, PlaylistForm
from flask_bootstrap import Bootstrap5

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///playlist-app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"

# Having the Debug Toolbar show redirects explicitly is often useful;
# however, if you want to turn it off, you can uncomment this line:
#
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
bootstrap = Bootstrap5(app)
debug = DebugToolbarExtension(app)


@app.route("/")
def root():
    """Homepage: redirect to /playlists."""

    return redirect("/playlists")


##############################################################################
# Playlist routes


@app.route("/playlists")
def show_all_playlists():
    """Return a list of playlists."""

    playlists = Playlist.query.all()
    return render_template("playlists.html", playlists=playlists)


@app.route("/playlists/<int:playlist_id>")
def show_playlist(playlist_id):
    """Show detail on specific playlist."""
    # Example: Filtering Playlist by name
    songs = db.session.query(Song).join(PlaylistSong).filter(PlaylistSong.playlist_id == playlist_id).all()
    playlist = Playlist.query.get_or_404(playlist_id)
    return render_template("playlist.html", playlist=playlist, songs=songs)

    # ADD THE NECESSARY CODE HERE FOR THIS ROUTE TO WORK


@app.route("/playlists/add", methods=["GET", "POST"])
def add_playlist():
    """Handle add-playlist form:

    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-playlists
    """
    form = PlaylistForm()
    if form.validate_on_submit():
        playlist = Playlist(name=form.name.data, description=form.description.data)
        db.session.add(playlist)
        db.session.commit()
        return redirect(url_for('show_all_playlists')) 
    return render_template("new_playlist.html", form=form)


##############################################################################
# Song routes


@app.route("/songs")
def show_all_songs():
    """Show list of songs."""

    songs = Song.query.all()
    return render_template("songs.html", songs=songs)


@app.route("/songs/<int:song_id>")
def show_song(song_id):
    """return a specific song"""
    songs = Song.query.get_or_404(song_id)
    return render_template("songs.html", songs=songs)


@app.route("/songs/add", methods=["GET", "POST"])
def add_song():
    """Handle add-song form:

    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-songs
    """
    form = SongForm()
    if form.validate_on_submit():
        playlist = Song(title=form.title.data, artist=form.artist.data)
        db.session.add(playlist)
        db.session.commit()
        return redirect(url_for('show_all_songs')) 
    return render_template("new_song.html", form=form)


@app.route("/playlists/<int:playlist_id>/add-song", methods=["GET", "POST"])
def add_song_to_playlist(playlist_id):
    """Add a song to a playlist."""

    playlist = Playlist.query.get_or_404(playlist_id)
    form = NewSongForPlaylistForm()

    # Dynamically populate dropdown with songs
    form.song.choices = [(song.id, song.title) for song in Song.query.all()]

    if form.validate_on_submit():
        song_id = form.song.data
        song = Song.query.get(song_id)
        if song:
            playlist.songs.append(song)
            db.session.commit() 
            return redirect(url_for('show_playlist', playlist_id=playlist_id))

    return render_template("add_song_to_playlist.html", playlist=playlist, form=form)