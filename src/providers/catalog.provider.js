import axios from 'axios';
import { env } from '../defaults/rcs.conf';

class CatalogProvider {
  members = env.rcsUrl.concat('/rcs/members');

  get() {
    return axios.get(this.members);
  }

  getCatalog(member) {
    return axios.get(this.members.concat('/', member));
  }
}

export default CatalogProvider;
