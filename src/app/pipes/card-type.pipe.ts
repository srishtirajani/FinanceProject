import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardType'
})
export class CardTypePipe implements PipeTransform {

  transform(value:boolean) {
    return value ? 'Gold' : 'Titanium';
}

}


