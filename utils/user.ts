export const setRecord = (record: number) => {
  if (record > getRecord()) {
    localStorage.setItem('record', record.toString());
    return true;
  }
  return false;
}

export const getRecord = () => {
  return parseInt(localStorage.getItem('record') || '0');
}