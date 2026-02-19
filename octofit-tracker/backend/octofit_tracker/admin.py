from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
	list_display = ('name', 'email', 'team', 'is_superhero')
	search_fields = ('name', 'email')
	list_filter = ('is_superhero', 'team')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
	list_display = ('name', 'created_at')
	search_fields = ('name',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
	list_display = ('user', 'activity_type', 'duration_minutes', 'activity_date')
	search_fields = ('user__name', 'activity_type')
	list_filter = ('activity_type', 'activity_date')


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
	list_display = ('user', 'points', 'rank', 'updated_at')
	search_fields = ('user__name',)
	ordering = ('rank',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
	list_display = ('name', 'difficulty', 'target_team', 'duration_minutes')
	search_fields = ('name', 'difficulty')
	list_filter = ('difficulty',)
