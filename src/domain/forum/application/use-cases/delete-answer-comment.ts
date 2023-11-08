/* eslint-disable @typescript-eslint/ban-types */
import { Either, left, right } from '@/core/either'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError, NotAllowedError } from './errors'

interface DeleteCommentOnAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}
type DeleteCommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteCommentOnAnswerUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) return left(new ResourceNotFoundError())

    if (authorId !== answerComment.authorId.toString())
      return left(new NotAllowedError())

    await this.answerCommentRepository.delete(answerComment)

    return right({})
  }
}
