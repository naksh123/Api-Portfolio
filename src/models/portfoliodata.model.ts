import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Portfoliodata extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  about?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Portfoliodata>) {
    super(data);
  }
}

export interface PortfoliodataRelations {
  // describe navigational properties here
}

export type PortfoliodataWithRelations = Portfoliodata & PortfoliodataRelations;
