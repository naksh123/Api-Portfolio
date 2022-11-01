import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Portfoliodata, PortfoliodataRelations} from '../models';

export class PortfoliodataRepository extends DefaultCrudRepository<
  Portfoliodata,
  typeof Portfoliodata.prototype.id,
  PortfoliodataRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Portfoliodata, dataSource);
  }
}
