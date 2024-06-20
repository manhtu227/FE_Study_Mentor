export const MY_ROUTE = {
    HOME: '/',
    AI: {
        self: '/ai',
        FREE: '/ai/free',
        PAID: '/ai/paid',
    },
    LIST_QUESTION: '/question-list',
    MENTOR: {
        self: '/mentor',
        FILE: `/mentor/file`,
        GOOGLE_MEET: `/mentor/google-meet`,
        RECEIVED_QUESTIONS: `/received-questions`,
    },
    AUTH: {
        self: '/auth',
        LOGIN: '/auth/login',
        SIGN_UP: '/auth/sign-up',
    },
    LOGIN: '/auth/login',
    SIGN_UP: '/auth/sign-up',
    RESET_PASSWORD: '/reset-password',
    DASHBOARD_TUTOR: '/dashboard-tutor',
    PROFILE: '/profile',
    REPORT: '/reports',
    DASHBOARD_STUDENT: '/dashboard-student',
};

export const roleUser = [
    MY_ROUTE.AI.self,
    MY_ROUTE.AI.FREE,
    MY_ROUTE.AI.PAID,
    MY_ROUTE.MENTOR.FILE,
    MY_ROUTE.MENTOR.GOOGLE_MEET,
    MY_ROUTE.MENTOR.self,
    MY_ROUTE.DASHBOARD_STUDENT,
];
export const roleTutor = [MY_ROUTE.DASHBOARD_TUTOR];

export const rolePublic = [
    MY_ROUTE.AUTH.LOGIN,
    MY_ROUTE.AUTH.SIGN_UP,
    MY_ROUTE.HOME,
    MY_ROUTE.LIST_QUESTION,
    MY_ROUTE.MENTOR.RECEIVED_QUESTIONS,
    MY_ROUTE.RESET_PASSWORD,
    MY_ROUTE.DASHBOARD_TUTOR,
    MY_ROUTE.PROFILE,
    MY_ROUTE.REPORT,
];
