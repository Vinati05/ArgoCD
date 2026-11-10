import sqlite3
import os
from flask import Flask, jsonify, request, session
app = Flask(__name__)

app.secret_key = os.environ.get("FLASK_SECRET_KEY", "")

# # Secret key security
if not app.secret_key:
    raise ValueError("No secret key set for Flask application")

DATABASE = "users.db"


def init_db():
    with sqlite3.connect(DATABASE) as connection:
        connection.execute(
            "CREATE TABLE IF NOT EXISTS users "
            "(id INTEGER PRIMARY KEY, username TEXT, email TEXT)"
        )
        connection.execute(
            "INSERT OR IGNORE INTO users (id, username, email) VALUES "
            "(1, 'alice', 'alice@example.com')"
        )
        connection.execute(
            "INSERT OR IGNORE INTO users (id, username, email) VALUES "
            "(2, 'bob', 'bob@example.com')"
        )


@app.route("/")
def home():
    return (
        "DevSecOps security demo. Try /user?id=1. "
        "This application is intentionally vulnerable for a local lab."
    )


@app.route("/user")
def get_user():
    user_id = request.args.get("id", "1")
    # # sql injection security
    if not user_id.isdigit():
        return jsonify({"error": "Invalid user ID"}), 400
    query = (
        "SELECT id, username, email FROM users WHERE id = " + user_id
    )
    try:
        with sqlite3.connect(DATABASE) as connection:
            connection.row_factory = sqlite3.Row
            rows = connection.execute(query).fetchall()
        return jsonify([dict(row) for row in rows])
    except sqlite3.Error:
        return jsonify({"error": "Invalid request"}), 400


if __name__ == "__main__":
    init_db()
    app.run(host="127.0.0.1", port=5000, debug=False)
