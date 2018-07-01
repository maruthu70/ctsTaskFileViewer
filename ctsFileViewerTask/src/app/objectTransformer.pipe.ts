import { PipeTransform, Pipe } from '@angular/core';
@Pipe({name: 'obejctToArray'})
export class obejctToArrayPipe implements PipeTransform {
  transform(currentValue, args:string[]) : any {
    let position = [];
    for (let latst in currentValue) {
        position.push(latst);
    }
    return position;
  }
}