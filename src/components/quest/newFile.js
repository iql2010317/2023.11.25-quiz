export default (await import('vue')).defineComponent({
data() {
return {
questionnaireId: '',
a: 5,
questArrLocal: JSON.parse(localStorage.getItem("questArrLocal")) || [],
doquestArr: [
{
userName: '',
userPhone: '',
userEmail: '',
userAge: '',

questionName: '',
description: '',
question: '',
options: [],
startTime: '',
endTime: '',
questionTypes: ["radio", "checkbox", "text"]
}
]
};
},
mounted() {
const questionnaireId = this.$route.params.questionnaireId; //動態路由
this.loadQuestionnaireData(questionnaireId);
this.chage(questionnaireId);
},
methods: {
loadQuestionnaireData(questionnaireId) {
this.questionnaireData = this.findQuestionnaireDataById(questionnaireId);
this.questionnaireId = questionnaireId;
console.log("這是ID值:" + questionnaireId);
},
findQuestionnaireDataById(questionnaireId) {
return this.questArrLocal.find(quest => quest.id === questionnaireId);
},
chage(a, questionnaireId) {
console.log("這是暫時利用的a值:" + a);
return this.a = Number(this.questionnaireId);

},
PreviewPage() {
}
},
components: {
previewdoQuestPage,
}
});
