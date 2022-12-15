from flask import Blueprint, render_template
import routes

views = Blueprint('views', __name__)


# Get areas
areas = []

for item in routes.__dict__.keys():
    # Add regex check below to match key names for lowercase
    if not item.startswith("__"):
        areas.append(item)

areas.sort()


@views.route('/')
def home():
    return render_template('index.html', encounter='Test', len=len(areas), possible_routes=areas)
