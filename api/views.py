from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Quiz, Response as QuizResponse
from django.contrib.auth.models import User

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_code(request):
    code = request.data.get('code')
    try:
        quiz = Quiz.objects.get(title=code)  # or use a separate 'code' field
        return Response({
            "quiz_id": quiz.id,
            "title": quiz.title,
            "questions": [{
                "id": q.id,
                "text": q.text,
                "options": [q.option1, q.option2, q.option3, q.option4]
            } for q in quiz.questions.all()]
        })
    except Quiz.DoesNotExist:
        return Response({"error": "invalid quiz code"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_response(request):
    user = request.user
    data = request.data.get('responses', [])
    
    for item in data:
        QuizResponse.objects.create(
            user=user,
            question_id=item['question_id'],
            selected_option=item['selected_option']
        )
    return Response({"message": "responses submitted ✅"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_attendance(request):
    user = request.user
    quiz_id = request.data.get('quiz_id')
    has_submitted = QuizResponse.objects.filter(user=user, question__quiz_id=quiz_id).exists()

    if has_submitted:
        # in real system: Attendance model could be used
        return Response({"message": "attendance marked ✅"})
    return Response({"error": "quiz not submitted"}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def disqualify_user(request):
    # called when tab switch is detected
    user = request.user
    return Response({"message": f"user {user.username} disqualified ❌"})
