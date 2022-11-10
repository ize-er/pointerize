export class InvalidRoot extends Error {
  constructor() {
    super()
    this.message = 'The root element could not be selected, please provide a different value.'
    this.name = this.constructor.name
  }
}
export class UnspecifiedProperty extends Error {
  constructor(name: string, props: Array<string>) {
    super()
    const propsString = props.map(p => `"${p}"`).join(', ')
    this.message = `for "${name}", you must specify one of: ${propsString}`
    this.name = this.constructor.name
  }
}
