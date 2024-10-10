export default function dateFormat(date) {
  if (date) {
    const formater = new Intl.DateTimeFormat('ru', {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: 'numeric',
      minute: 'numeric'
    });
    return formater.format(new Date(date)).replace(' г.', '');
  }
}