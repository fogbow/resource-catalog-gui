import axios from 'axios';
import { env } from '../defaults/rcs.conf';

class CatalogProvider {
  members = env.rcsUrl.concat('/rcs/members');
  services = env.rcsUrl.concat('/rcs/services');
  config = env.rcsUrl.concat('/rcs/config');

  get() {
    return axios.get(this.members);
  }

  getCatalog(member) {
    return axios.get(this.members.concat('/', member));
  }

  deleteCache(member, service) {
    return axios.delete(this.services.concat('/', member, '/', service));
  }

  setExpiration(value) {
    return axios.put(this.config.concat('/expiration_time'), value);
  }
}

export default CatalogProvider;
