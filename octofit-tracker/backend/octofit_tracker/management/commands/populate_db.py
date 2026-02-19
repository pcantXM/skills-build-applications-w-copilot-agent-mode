from datetime import date, timedelta

from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = "Populate the octofit_db database with test data"

    def handle(self, *args, **options):
        team_avengers, _ = Team.objects.get_or_create(
            name='Avengers',
            defaults={'description': 'Earth\'s mightiest fitness heroes'},
        )
        team_guardians, _ = Team.objects.get_or_create(
            name='Guardians',
            defaults={'description': 'Intergalactic training crew'},
        )

        user_peter, _ = User.objects.get_or_create(
            email='peter.parker@octofit.test',
            defaults={
                'name': 'Peter Parker',
                'team': team_avengers,
                'is_superhero': True,
            },
        )
        user_nakia, _ = User.objects.get_or_create(
            email='nakia@octofit.test',
            defaults={
                'name': 'Nakia',
                'team': team_avengers,
                'is_superhero': True,
            },
        )
        user_rocket, _ = User.objects.get_or_create(
            email='rocket@octofit.test',
            defaults={
                'name': 'Rocket',
                'team': team_guardians,
                'is_superhero': True,
            },
        )

        workout_strength, _ = Workout.objects.get_or_create(
            name='Hero Strength Circuit',
            defaults={
                'description': 'Full body strength intervals',
                'difficulty': 'Medium',
                'target_team': team_avengers,
                'duration_minutes': 45,
            },
        )
        workout_cardio, _ = Workout.objects.get_or_create(
            name='Galaxy Cardio Burst',
            defaults={
                'description': 'High intensity cardio session',
                'difficulty': 'Hard',
                'target_team': team_guardians,
                'duration_minutes': 35,
            },
        )

        today = date.today()
        Activity.objects.get_or_create(
            user=user_peter,
            workout=workout_strength,
            activity_type='Strength',
            duration_minutes=45,
            calories_burned=420,
            activity_date=today,
        )
        Activity.objects.get_or_create(
            user=user_nakia,
            workout=workout_strength,
            activity_type='Strength',
            duration_minutes=40,
            calories_burned=380,
            activity_date=today - timedelta(days=1),
        )
        Activity.objects.get_or_create(
            user=user_rocket,
            workout=workout_cardio,
            activity_type='Cardio',
            duration_minutes=35,
            calories_burned=460,
            activity_date=today - timedelta(days=2),
        )

        Leaderboard.objects.update_or_create(
            user=user_rocket,
            defaults={'points': 1460, 'rank': 1},
        )
        Leaderboard.objects.update_or_create(
            user=user_peter,
            defaults={'points': 1420, 'rank': 2},
        )
        Leaderboard.objects.update_or_create(
            user=user_nakia,
            defaults={'points': 1380, 'rank': 3},
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated test data.'))
