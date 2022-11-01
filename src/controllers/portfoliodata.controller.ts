import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { basicAuthorization } from '../middlewares/auth.midd';
import {Portfoliodata} from '../models';
import {PortfoliodataRepository} from '../repositories';

export class PortfoliodataController {
  constructor(
    @repository(PortfoliodataRepository)
    public portfoliodataRepository : PortfoliodataRepository,
  ) {}

  @post('/portfoliodata')
  @response(200, {
    description: 'Portfoliodata model instance',
    content: {'application/json': {schema: getModelSchemaRef(Portfoliodata)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfoliodata, {
            title: 'NewPortfoliodata',
            exclude: ['id'],
          }),
        },
      },
    })
    portfoliodata: Omit<Portfoliodata, 'id'>,
  ): Promise<Portfoliodata> {
    return this.portfoliodataRepository.create(portfoliodata);
  }

  @get('/portfoliodata/count')
  @response(200, {
    description: 'Portfoliodata model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  async count(
    @param.where(Portfoliodata) where?: Where<Portfoliodata>,
  ): Promise<Count> {
    return this.portfoliodataRepository.count(where);
  }

  @get('/portfoliodata')
  @response(200, {
    description: 'Array of Portfoliodata model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Portfoliodata, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(Portfoliodata) filter?: Filter<Portfoliodata>,
  ): Promise<Portfoliodata[]> {
    return this.portfoliodataRepository.find(filter);
  }

  @patch('/portfoliodata')
  @response(200, {
    description: 'Portfoliodata PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfoliodata, {partial: true}),
        },
      },
    })
    portfoliodata: Portfoliodata,
    @param.where(Portfoliodata) where?: Where<Portfoliodata>,
  ): Promise<Count> {
    return this.portfoliodataRepository.updateAll(portfoliodata, where);
  }

  @get('/portfoliodata/{id}')
  @response(200, {
    description: 'Portfoliodata model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Portfoliodata, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Portfoliodata, {exclude: 'where'}) filter?: FilterExcludingWhere<Portfoliodata>
  ): Promise<Portfoliodata> {
    return this.portfoliodataRepository.findById(id, filter);
  }

  @patch('/portfoliodata/{id}')
  @response(204, {
    description: 'Portfoliodata PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfoliodata, {partial: true}),
        },
      },
    })
    portfoliodata: Portfoliodata,
  ): Promise<void> {
    await this.portfoliodataRepository.updateById(id, portfoliodata);
  }

  @put('/portfoliodata/{id}')
  @response(204, {
    description: 'Portfoliodata PUT success',
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() portfoliodata: Portfoliodata,
  ): Promise<void> {
    await this.portfoliodataRepository.replaceById(id, portfoliodata);
  }

  @del('/portfoliodata/{id}')
  @response(204, {
    description: 'Portfoliodata DELETE success',
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.portfoliodataRepository.deleteById(id);
  }
}
