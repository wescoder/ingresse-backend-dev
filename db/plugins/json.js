export const json = Model => {
  Model.prototype.json = async function json () {
    return JSON.parse(JSON.stringify(this.get()))
  }
}

export default json
