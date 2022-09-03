import { Injectable } from '@angular/core';
import { INGXLoggerConfig, INGXLoggerMetadata, NgxLoggerLevel, NGXLoggerWriterService } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class MyLoggerWriterService extends NGXLoggerWriterService {
  protected override prepareMetaString(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): string {
    const fileName = metadata.fileName?.charAt(0) === '.' ? 'webpack://' + metadata.fileName?.substring(1) : metadata.fileName;
    return super.prepareMetaString({ ...metadata, fileName }, config);
  }
}
