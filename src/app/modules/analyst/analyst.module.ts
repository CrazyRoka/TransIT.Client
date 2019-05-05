import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalystRoutingModule } from './analyst-routing.module';
import { AnalystComponent } from './components/analyst/analyst.component';
import { CoreModule } from '../core/core.module';
import { WebDataRocksPivot } from 'src/types/webdatarocks/webdatarocks.angular4';

@NgModule({
  declarations: [AnalystComponent, WebDataRocksPivot],
  imports: [CommonModule, AnalystRoutingModule, CoreModule]
})
export class AnalystModule {}
