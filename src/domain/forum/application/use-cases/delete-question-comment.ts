import { Either, left, right } from '@/core/either'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'
import { NotAllowedError, ResourceNotFoundError } from './errors'

interface DeleteCommentOnQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}
type DeleteCommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteCommentOnQuestionUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) return left(new ResourceNotFoundError())

    if (authorId !== questionComment.authorId.toString())
      return left(new NotAllowedError())

    await this.questionCommentRepository.delete(questionComment)

    return right({})
  }
}
