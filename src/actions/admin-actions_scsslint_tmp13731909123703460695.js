import {
    action,
    SET_OPEN_ADMIN_FULLSCREEN_DIALOG,
    GET_OWN_CONTESTS,
    UPDATE_OWN_CONTESTS,
    OPEN_CREATE_QUESTION_DIALOG,
    UPDATE_EDITING_QUESTION,
    UPDATE_EDITING_TEST,
    UPDATE_EDITING_CONTEST,
    CANCEL_CREATE_QUESTION_DIALOG,
    UPDATE_OWN_QUESTION_BY_ID,
    POST_TEST,
    GET_OWN_TESTS,
    UPDATE_OWN_TESTS,
    UPDATE_OWN_QUESTIONS,
    UPDATE_OWN_TEST_BY_ID,
    POST_CONTEST,
    UPDATE_OWN_CONTEST_BY_ID,
    GET_OWN_QUESTIONS,
    DELETE_OWN_CONTEST,
    DELETE_OWN_TEST,
    DELETE_OWN_QUESTION,
    UPDATE_REMOVED_CONTEST_BY_ID,
    UPDATE_REMOVED_TEST_BY_ID,
    UPDATE_REMOVED_QUESTION_BY_ID,
    PUT_TEST,
    PUT_QUESTION,
    ADD_OWN_CONTEST,
    PUT_CONTEST,
    POST_QUESTION,
    CLEAR_EDITING_CONTEST,
    CLEAR_EDITING_TEST,
    CLEAR_EDITING_QUESTION,
    GET_CONTEST_RESULTS_BY_ID, UPDATE_PARTITION_OF_CONTEST_BY_ID
} from './action-types';

export const setOpenAdminFullscreenDialog = value => action(SET_OPEN_ADMIN_FULLSCREEN_DIALOG, {value});

export const getOwnContests = () => action(GET_OWN_CONTESTS);

export const getOwnTests = () => action(GET_OWN_TESTS);

export const getOwnQuestions = () => action(GET_OWN_QUESTIONS);

export const getContestResultsById = (contestId) => action(GET_CONTEST_RESULTS_BY_ID, contestId);

export const updateOwnTests = (tests) => action(UPDATE_OWN_TESTS, {tests});

export const clearEditingContest = () => action(CLEAR_EDITING_CONTEST);
export const clearEditingTest = () => action(CLEAR_EDITING_TEST);
export const clearEditingQuestion = () => action(CLEAR_EDITING_QUESTION);

export const openCreateQuestionDialog = () => action(OPEN_CREATE_QUESTION_DIALOG);

export const cancelCreateQuestionDialog = () => action(CANCEL_CREATE_QUESTION_DIALOG);

export const updateEditingQuestion = (question) => action(UPDATE_EDITING_QUESTION, question);

export const updateEditingTest = (test) => action(UPDATE_EDITING_TEST, test);

export const updateEditingContest = (contest) => action(UPDATE_EDITING_CONTEST, contest);

export const updateOwnQuestions = (questions) => action(UPDATE_OWN_QUESTIONS, {questions});

export const updateOwnQuestionById = (id, question) => action(UPDATE_OWN_QUESTION_BY_ID, {id, question});

export const updateOwnTestById = (id, test) => action(UPDATE_OWN_TEST_BY_ID, {id, test});

export const updateOwnContests = (contests) => action(UPDATE_OWN_CONTESTS, {contests});

export const updateOwnContestById = (id, contest) => action(UPDATE_OWN_CONTEST_BY_ID, {id, contest});

export const addNewOwnContest = (contest) => action(ADD_OWN_CONTEST,            contest);
export const addNewOwnTest = (test) => action(ADD_OWN_CONTEST,               test);
export const addNewOwnQuestion = (question) => action(ADD_OWN_CONTEST, question);

export const postTest = (test, onSuccess) => action(POST_TEST, {test, onSuccess});

export const postContest = (contest) => action(POST_CONTEST, contest);
export const putContest = (contest) => action(PUT_CONTEST, contest);
export const postQuestion= (question) => action(POST_QUESTION,question);
export const putQuestion = (question) => action(PUT_QUESTION, question);
export const putTest = (test, onSuccess) => action(PUT_TEST, {test, onSuccess});

export const deleteOwnContest = (contestId) => action(DELETE_OWN_CONTEST, contestId);
export const deleteOwnTest = (testId) => action(DELETE_OWN_TEST, testId);
export const deleteOwnQuestion = (questionId) => action(DELETE_OWN_QUESTION, questionId);

export const updateRemovedOwnContestById = (contestId) => action(UPDATE_REMOVED_CONTEST_BY_ID, contestId);
export const updateRemovedOwnTestById = (testId) => action(UPDATE_REMOVED_TEST_BY_ID, testId);
export const updateRemovedOwnQuestionById = (questionId) => action(UPDATE_REMOVED_QUESTION_BY_ID, questionId);
export const updatePartitionOfContestById = (contestId, contestParams) => action(UPDATE_PARTITION_OF_CONTEST_BY_ID, {
    id: contestId,
    contest: contestParams
})


