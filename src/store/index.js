import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            classes: [],
            insClasses: [],
            studentList: [],
            userName: '',
            userRole: 'student',
            userID: '',
            token: '',
            school: '',
            isInstructor: false,
            isStudent: false
        };
    },
    mutations: {
        addMemory(state, memoryData) {
            const newMemory = {
                id: new Date().toISOString(),
                title: memoryData.title,
                image: memoryData.imageUrl,
                description: memoryData.description
            };

            state.memories.unshift(newMemory);
        },
        addUserName(state, userName) {
            state.userName = userName;
        },
        addUserID(state, userID) {
            state.userID = userID;
        },

        addClasses(state, classes) {
            state.classes = classes;
        },

        addInsClasses(state, insClasses) {
            state.insClasses = insClasses;
        },

        addToken(state, token) {
            state.token = token;
        },
        addSchool(state, school) {
            state.school = school;
        },
        addStudent(state, isStudent) {
            state.isStudent = isStudent;
        },
        addInstructor(state, isInstructor) {
            state.isInstructor = isInstructor;
        },
        addStudentList(state, studentList) {
            state.studentList = studentList;
        },

    },
    actions: {
        addMemory(context, memoryData) {
            context.commit('addMemory', memoryData);
        },
        addUserName(context, userName) {
            context.commit('addUserName', userName);
        },
        addUserID(context, userID) {
            context.commit('addUserID', userID);
        },
        addClasses(context, classes) {
            context.commit('addClasses', classes);
        },
        addInsClasses(context, insClasses) {
            context.commit('addInsClasses', insClasses);
        },
        addToken(context, token) {
            context.commit('addToken', token);
        },
        addSchool(context, school) {
            context.commit('addSchool', school);
        },
        addStudent(context, isStudent) {
            context.commit('addStudent', isStudent);
        },
        addInstructor(context, isInstructor) {
            context.commit('addInstructor', isInstructor);
        },
        addStudentList(context, studentList) {
            context.commit('addStudentList', studentList);
        }

    },
    getters: {
        memories(state) {
            return state.memories;
        },
        memory(state) {
            return (memoryId) => {
                return state.memories.find((memory) => memory.id === memoryId);
            };
        },
        getUserID(state) {
            return state.userID;
        },
        getUserName(state) {
            return state.userName;
        },
        getUserRole(state) {
            return state.userRole;
        },
        getClasses(state) {
            return state.classes;
        },
        getInsClasses(state) {
            return state.insClasses;
        },
        getStudentList(state) {
            return state.studentList;
        },
        cuClass(state) {
            return (courseNumber) => {
                return state.classes.find((cuClass) => cuClass.courseNumber === courseNumber)
            }
        },
        cuInsClass(state) {
            return (courseNumber) => {
                //return state.insClasses.find((cuInsClass) => (cuInsClass.courseNumber) === courseNumber)

                return state.insClasses.find((cuInsClass) =>
                    (cuInsClass.semester + "-" +
                        cuInsClass.courseNumber + "-" +
                        cuInsClass.courseSection + "-" +
                        cuInsClass.labSection
                    ) === courseNumber)

                /*return state.insClasses.filter(function(cuInsClass){
                    if( 
                        cuInsClass.semester === semester &&
                        cuInsClass.courseNumber === courseNumber &&
                        cuInsClass.courseSection === courseSection &&
                        cuInsClass.labSection === labSection
                        ) { 
                            return cuInsClass;
                        } 

                });*/
            }

        },
        cuStudentList(state) {
            return (studentId) => {
                return state.studentList.find((cuStudentList) => cuStudentList.studentId.toString() == studentId)
            }
        },
        getToken(state) {
            return state.token;
        },
        getIsStudent(state) {
            return state.isStudent;
        },
        getIsInstructor(state) {
            return state.isInstructor;
        },

    },
});

export default store;