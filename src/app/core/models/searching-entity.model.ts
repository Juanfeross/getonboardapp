export class SearchingEntity<E> {
  searching: boolean = false;
  found: boolean = false;
  entityList: E[] = [];

  public init(): SearchingEntity<E> {
    this.searching = true;
    this.found = false;
    // this.entityList = [];
    return this;
  }

  public end(response: E[]): SearchingEntity<E> {
    this.searching = false;
    this.entityList = response;
    this.found = this.entityList.length > 0;
    return this;
  }
}
