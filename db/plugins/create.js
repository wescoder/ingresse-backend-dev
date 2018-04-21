export const create = Model => {
  Model.create = async function create (...args) {
    const model = new Model(...args)
    await model.save()
    return model.get()
  }
}

export default create
