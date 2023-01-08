export function isEmpty(value: any) {
  if (value && value?.length) {
    return false
  }
  return true
}
