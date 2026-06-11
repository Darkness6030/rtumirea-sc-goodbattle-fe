export interface paths {
    "/api/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Register User */
        post: operations["register_user_api_auth_register_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login User */
        post: operations["login_user_api_auth_login_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Logout User */
        post: operations["logout_user_api_auth_logout_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Self User */
        get: operations["get_self_user_api_auth_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Profile */
        get: operations["get_profile_api_profile_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/languages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Languages */
        get: operations["list_languages_api_languages_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tasks/generate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Generate Task Draft */
        post: operations["generate_task_draft_api_tasks_generate_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tasks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Tasks */
        get: operations["list_tasks_api_tasks_get"];
        put?: never;
        /** Create Task */
        post: operations["create_task_api_tasks_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tasks/{task_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Task */
        get: operations["get_task_api_tasks__task_id__get"];
        /** Update Task */
        put: operations["update_task_api_tasks__task_id__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/rooms": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create Room */
        post: operations["create_room_api_rooms_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/rooms/join": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Join Room */
        post: operations["join_room_api_rooms_join_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/rooms/{room_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Room Details */
        get: operations["get_room_details_api_rooms__room_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/battles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Battles */
        get: operations["list_battles_api_battles_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** BattleHistoryItemResponse */
        BattleHistoryItemResponse: {
            /** Id */
            id: string;
            /** Title */
            title: string;
            /** Date */
            date: string;
            /** Status */
            status: string;
            /** Role */
            role: string;
            /** Participants */
            participants: number;
            /** Languages */
            languages: string[];
            /** Total Tasks */
            total_tasks: number;
            /** Solved Tasks */
            solved_tasks: number;
            /** Place */
            place?: number | null;
        };
        /** BattleTaskResponse */
        BattleTaskResponse: {
            /** Id */
            id: string;
            /** Title */
            title: string;
            /** Description */
            description: string;
            /** Examples */
            examples: components["schemas"]["TaskExampleResponse"][];
        };
        /** CreateRoomRequest */
        CreateRoomRequest: {
            /** Languages */
            languages: string[];
            /** Task Ids */
            task_ids: string[];
            /** Time Limit */
            time_limit: number;
        };
        /** CreateRoomResponse */
        CreateRoomResponse: {
            /** Room Id */
            room_id: string;
            /** Code */
            code: string;
        };
        /** CreateTaskRequest */
        CreateTaskRequest: {
            /** Title */
            title: string;
            /** Description */
            description: string;
            /** Time Limit Ms */
            time_limit_ms: number;
            /** Memory Limit Mb */
            memory_limit_mb: number;
            /** Examples */
            examples?: components["schemas"]["TaskExampleRequest"][];
            /** Test Cases */
            test_cases: components["schemas"]["TaskTestCaseRequest"][];
        };
        /** GenerateTaskRequest */
        GenerateTaskRequest: {
            /** Prompt */
            prompt: string;
            /** Temperature */
            temperature: number;
            /** Topic */
            topic: string;
            /** Difficulty */
            difficulty: string;
        };
        /** GeneratedTaskExampleResponse */
        GeneratedTaskExampleResponse: {
            /** Input */
            input: string;
            /** Output */
            output: string;
        };
        /** GeneratedTaskResponse */
        GeneratedTaskResponse: {
            /** Title */
            title: string;
            /** Description */
            description: string;
            /** Time Limit Ms */
            time_limit_ms: number;
            /** Memory Limit Mb */
            memory_limit_mb: number;
            /** Examples */
            examples: components["schemas"]["GeneratedTaskExampleResponse"][];
            /** Test Cases */
            test_cases: components["schemas"]["GeneratedTaskTestCaseResponse"][];
        };
        /** GeneratedTaskTestCaseResponse */
        GeneratedTaskTestCaseResponse: {
            /** Input */
            input: string;
            /** Expected Output */
            expected_output: string;
            /** Is Hidden */
            is_hidden: boolean;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** JoinRoomRequest */
        JoinRoomRequest: {
            /** Code */
            code: string;
        };
        /** JoinRoomResponse */
        JoinRoomResponse: {
            /** Participant Id */
            participant_id: string;
            /** Room Id */
            room_id: string;
        };
        /** LanguageResponse */
        LanguageResponse: {
            /** Id */
            id: number;
            /** Code */
            code: string;
            /** Name */
            name: string;
        };
        /** LoginRequest */
        LoginRequest: {
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Password */
            password: string;
        };
        /** ParticipantResponse */
        ParticipantResponse: {
            /** Id */
            id: string;
            /** User Id */
            user_id: string;
            /** Username */
            username: string;
            /** Role */
            role: string;
            /** Language */
            language: string;
            /** Code */
            code: string;
        };
        /** ParticipantSolvedTasksResponse */
        ParticipantSolvedTasksResponse: {
            /** User Id */
            user_id: string;
            /** Solved Task Ids */
            solved_task_ids: string[];
        };
        /** ProfileResponse */
        ProfileResponse: {
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Username */
            username: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Top Language */
            top_language: string | null;
            /** Battles Played */
            battles_played: number;
            /** Battles Organized */
            battles_organized: number;
            /** Win Rate */
            win_rate: number;
            /** Wins Count */
            wins_count: number;
        };
        /** RegisterRequest */
        RegisterRequest: {
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Username */
            username: string;
            /** Password */
            password: string;
        };
        /** RoomAiHintInfoResponse */
        RoomAiHintInfoResponse: {
            /** Task Id */
            task_id?: string | null;
            /** Used */
            used: boolean;
            /** Question */
            question?: string | null;
            /** Answer */
            answer?: string | null;
        };
        /** RoomResponse */
        RoomResponse: {
            /** Id */
            id: string;
            /** Code */
            code: string;
            /** Status */
            status: string;
            /** Role */
            role: string;
            /** Current Task Index */
            current_task_index: number;
            /** Total Tasks */
            total_tasks: number;
            /** Time Limit */
            time_limit: number;
            /** Remaining Seconds */
            remaining_seconds: number;
            /** Languages */
            languages: string[];
            /** Tasks */
            tasks: components["schemas"]["BattleTaskResponse"][];
            /** Participants */
            participants: components["schemas"]["ParticipantResponse"][];
            /** Participants Solved Tasks */
            participants_solved_tasks: components["schemas"]["ParticipantSolvedTasksResponse"][];
            ai_hint: components["schemas"]["RoomAiHintInfoResponse"];
        };
        /** TaskCreatorResponse */
        TaskCreatorResponse: {
            /** Id */
            id: string;
            /** Username */
            username: string;
        };
        /** TaskDetailResponse */
        TaskDetailResponse: {
            /** Id */
            id: string;
            /** Title */
            title: string;
            /** Description */
            description: string;
            /** Time Limit Ms */
            time_limit_ms: number;
            /** Memory Limit Mb */
            memory_limit_mb: number;
            creator: components["schemas"]["TaskCreatorResponse"] | null;
            /** Examples */
            examples: components["schemas"]["TaskExampleResponse"][];
            /** Test Cases */
            test_cases: components["schemas"]["TaskTestCaseResponse"][];
        };
        /** TaskExampleRequest */
        TaskExampleRequest: {
            /** Input */
            input: string;
            /** Output */
            output: string;
        };
        /** TaskExampleResponse */
        TaskExampleResponse: {
            /** Input */
            input: string;
            /** Output */
            output: string;
        };
        /** TaskResponse */
        TaskResponse: {
            /** Id */
            id: string;
            /** Title */
            title: string;
            /** Description */
            description: string;
            /** Time Limit Ms */
            time_limit_ms: number;
            /** Memory Limit Mb */
            memory_limit_mb: number;
            creator: components["schemas"]["TaskCreatorResponse"] | null;
            /** Examples */
            examples: components["schemas"]["TaskExampleResponse"][];
        };
        /** TaskTestCaseRequest */
        TaskTestCaseRequest: {
            /** Input */
            input: string;
            /** Expected Output */
            expected_output: string;
            /**
             * Is Hidden
             * @default true
             */
            is_hidden: boolean;
        };
        /** TaskTestCaseResponse */
        TaskTestCaseResponse: {
            /** Input */
            input: string;
            /** Expected Output */
            expected_output: string;
            /** Is Hidden */
            is_hidden: boolean;
        };
        /** UpdateTaskRequest */
        UpdateTaskRequest: {
            /** Title */
            title: string;
            /** Description */
            description: string;
            /** Time Limit Ms */
            time_limit_ms: number;
            /** Memory Limit Mb */
            memory_limit_mb: number;
            /** Examples */
            examples?: components["schemas"]["TaskExampleRequest"][];
            /** Test Cases */
            test_cases: components["schemas"]["TaskTestCaseRequest"][];
        };
        /** UserResponse */
        UserResponse: {
            /** Id */
            id: string;
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Username */
            username: string;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
            /** Input */
            input?: unknown;
            /** Context */
            ctx?: Record<string, never>;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    register_user_api_auth_register_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RegisterRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    login_user_api_auth_login_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    logout_user_api_auth_logout_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    get_self_user_api_auth_me_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserResponse"];
                };
            };
        };
    };
    get_profile_api_profile_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProfileResponse"];
                };
            };
        };
    };
    list_languages_api_languages_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LanguageResponse"][];
                };
            };
        };
    };
    generate_task_draft_api_tasks_generate_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GenerateTaskRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GeneratedTaskResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_tasks_api_tasks_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskResponse"][];
                };
            };
        };
    };
    create_task_api_tasks_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateTaskRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskDetailResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_task_api_tasks__task_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                task_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskDetailResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_task_api_tasks__task_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                task_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateTaskRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskDetailResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_room_api_rooms_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateRoomRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateRoomResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    join_room_api_rooms_join_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["JoinRoomRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JoinRoomResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_room_details_api_rooms__room_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                room_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RoomResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_battles_api_battles_get: {
        parameters: {
            query?: {
                role?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BattleHistoryItemResponse"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
