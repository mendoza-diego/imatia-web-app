import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {
    if (!value || value.trim() == "") {
      return list;
    }

    return list.filter(item => item.id.toString().includes(value.trim()));

 }

}
