const BaseService = require('./base.service');
let _ideaRepository = null;


class IdeaService extends BaseService {
  constructor({ IdeaRepository }) {
    super(IdeaRepository);
    _ideaRepository = IdeaRepository;
  }

  async getUserIdeas(author) {
    if (!author) throw new Error({ status: 400, message: "userId debe ser enviado" });
    return await _ideaRepository.getUserIdeas(author);
  }

  async upvoteIdea(ideaId) {
    if (!ideaId) throw new Error({ status: 400, message: "ideaId debe ser enviado" });
    const idea = await _ideaRepository.get(id);
    if (!idea) throw new Error({ status: 400, message: "Idea no existe" });
    idea.upvotes.push(true);
    return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
  }

  async upvoteIdea(ideaId) {
    if (!ideaId) throw new Error({ status: 400, message: "ideaId debe ser enviado" });
    const idea = await _ideaRepository.get(id);
    if (!idea) throw new Error({ status: 400, message: "Idea no existe" });
    idea.downvotes.push(true);
    return await _ideaRepository.update(ideaId, { upvotes: idea.downvotes });
  }
}

module.exports = IdeaService;