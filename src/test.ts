function Componetn(target: Function) {
  console.log(target);
}

@Componetn
export class User {
  id: number;

  updateId(newId: number) {
    this.id = newId;
    return this.id;
  }
}

// console.log(new User())