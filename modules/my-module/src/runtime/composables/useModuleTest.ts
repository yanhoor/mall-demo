export const useModuleTest = () => {
  const moduleRef = ref(0)
  console.log('==============useModuleTest===========')

  return {
    modRef: moduleRef
  }
}
