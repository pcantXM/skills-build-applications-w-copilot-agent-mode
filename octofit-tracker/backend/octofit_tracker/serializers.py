from rest_framework import serializers

from .models import Activity, Leaderboard, Team, User, Workout

try:
    from bson import ObjectId
except Exception:
    ObjectId = None


def _stringify_object_ids(value):
    if ObjectId is not None and isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, dict):
        return {key: _stringify_object_ids(item) for key, item in value.items()}
    if isinstance(value, list):
        return [_stringify_object_ids(item) for item in value]
    return value


class ObjectIdModelSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        return _stringify_object_ids(super().to_representation(instance))


class TeamSerializer(ObjectIdModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_at']


class UserSerializer(ObjectIdModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'team', 'is_superhero']


class WorkoutSerializer(ObjectIdModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'difficulty', 'target_team', 'duration_minutes']


class ActivitySerializer(ObjectIdModelSerializer):
    class Meta:
        model = Activity
        fields = [
            'id',
            'user',
            'workout',
            'activity_type',
            'duration_minutes',
            'calories_burned',
            'activity_date',
        ]


class LeaderboardSerializer(ObjectIdModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'points', 'rank', 'updated_at']
