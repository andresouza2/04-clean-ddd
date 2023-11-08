import { Either, left, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}
type FetchAnswerCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    if (!answerComments) return left(new ResourceNotFoundError())

    return right({ answerComments })
  }
}
