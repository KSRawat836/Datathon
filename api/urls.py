from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuizViewSet, QuestionViewSet, ResponseViewSet
from . import views

router = DefaultRouter()
router.register(r'quizzes', QuizViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'responses', ResponseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('verify-code/', views.verify_code),
    path('submit-response/', views.submit_response),
    path('mark-attendance/', views.mark_attendance),
    path('disqualify/', views.disqualify_user),
]
