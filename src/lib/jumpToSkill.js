export default function (thiz, skill) {
  thiz.setAscendancy(skill.jobIndex);
  thiz.activateRelated(skill.id);
  setTimeout(() => thiz.deactivateRelated(skill.id), 3000);
}
