import moment from 'moment';

function getAgeText(birthDay) {
  var years = moment().diff(birthDay, 'years', false);
  if (years > 1) {
    return years + " anos";
  }
  if (years === 1) {
    return years + " ano";
  }
  var months = moment().diff(birthDay, 'months', false);
  if (months !== 1) {
    return months + " meses";
  }
  return "1 mês";
}

export {getAgeText}