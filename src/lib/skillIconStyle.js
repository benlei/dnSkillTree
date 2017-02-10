export default function (skill, level) {
  const icon = Math.floor(skill.icon / 200) + 1;
  const sprite = icon < 10 ? `0${icon}` : icon;
  const row = Math.floor((skill.icon % 200) / 10);
  const col = skill.icon % 10;
  const suffix = level ? '' : '_b';

  return {
    backgroundImage: `url(${process.env.ASSETS_URL}/images/skillicon${sprite}${suffix}.png)`,
    backgroundPosition: `-${col * 50}px -${row * 50}px`,
  };
}
