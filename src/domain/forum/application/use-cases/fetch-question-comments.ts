import { Either, left, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from './errors'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}
type FetchQuestionCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    if (!questionComments) return left(new ResourceNotFoundError())

    return right({
      questionComments,
    })
  }
}
