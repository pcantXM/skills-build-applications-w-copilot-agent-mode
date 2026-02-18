from datetime import date

from django.test import TestCase
from rest_framework.test import APIClient

from .models import Activity, Leaderboard, Team, User, Workout


class ApiRoutingTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_root_points_to_api(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('users', response.json())
        self.assertIn('/api/users/', response.json()['users'])

    def test_api_root_present(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('leaderboard', response.json())


class ResourceEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(name='Octo Runners', description='Fast team')
        self.user = User.objects.create(
            name='Mona Octo',
            email='mona@example.com',
            team=self.team,
            is_superhero=True,
        )
        self.workout = Workout.objects.create(
            name='HIIT Blast',
            description='Interval cardio workout',
            difficulty='Medium',
            target_team=self.team,
            duration_minutes=35,
        )
        Activity.objects.create(
            user=self.user,
            workout=self.workout,
            activity_type='Run',
            duration_minutes=45,
            calories_burned=420,
            activity_date=date.today(),
        )
        Leaderboard.objects.create(user=self.user, points=150, rank=1)

    def test_collections_list(self):
        endpoints = [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/',
        ]
        for endpoint in endpoints:
            response = self.client.get(endpoint)
            self.assertEqual(response.status_code, 200)
            self.assertIn('results', response.json())
            self.assertGreaterEqual(len(response.json()['results']), 1)

    def test_create_user(self):
        payload = {
            'name': 'Riley Fit',
            'email': 'riley@example.com',
            'team': self.team.pk,
            'is_superhero': False,
        }
        response = self.client.post('/api/users/', payload, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['email'], 'riley@example.com')
