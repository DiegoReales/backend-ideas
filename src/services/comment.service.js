const CustomError = require('../helpers/custom-error.helper');
const BaseService = require('./base.service');
let _commentRepository = null;
let _ideaRepository = null;


class CommentService extends BaseService {
  constructor({ CommentRepository, IdeaRepository }) {
    super(CommentRepository);
    _commentRepository = CommentRepository;
    _ideaRepository = IdeaRepository;
  }

  async getIdeaComments(ideaId) {
    if (!ideaId) throw new CustomError(400, "ideaId debe ser enviado");
    const idea = _ideaRepository.get(ideaId);
    if (!idea) throw new CustomError(400, "Idea no existe");
    const { comments } = idea;
    return comments;
  }

  async createComment(ideaId, comment) {
    if (!ideaId) throw new CustomError(400, "ideaId debe ser enviado");
    const idea = _ideaRepository.get(ideaId);
    if (!idea) throw new CustomError(400, "Idea no existe");
    const createdComment = await _commentRepository.createComment(comments);
    idea.comments.push(createdComment);
    return await _ideaRepository.update(ideaId, { comments: idea.comments });
  }
}

module.exports = CommentService;