class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async get(id) {
    if (!id) throw new Error({ status: 400, message: "id debe ser enviado" });
    const currentEntity = await this.repository.get(id);
    if (!currentEntity) throw new Error({ status: 404, message: "Entidad no encontrada." });
    return currentEntity;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async create(entity) {
    return await this.repository.create(entity);
  }

  async update(id, entity) {
    if (!id) throw new Error({ status: 400, message: "id debe ser enviado" });
    return await this.repository.update(id, entity);
  }

  async delete(id) {
    if (!id) throw new Error({ status: 400, message: "id debe ser enviado" });
    return await this.repository.delete(id);
  }
}

module.exports = BaseService;