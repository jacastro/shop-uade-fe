import { get } from "services"

class Warranty {
  static list() {
    return get(`/warranties/`);
  }

  static getName(id) {
    const warrantyNames = {
      NONE: 'Sin garantía',
      SIXMONTHS: '6 meses de garantía',
      ONEYEAR: '1 año de garantía',
      TWOYEARS: '2 años de garantía',
    };

    return warrantyNames[id];
  }
}

export default Warranty;