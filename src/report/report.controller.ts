import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  ParseIntPipe,
  StreamableFile,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async createReport(
    @Body('serviceName') serviceName: string,
    @Body('endpoint') endpoint: string,
    @Body('headers') headers: string[],
  ) {
    const reportId = await this.reportService.createReport(
      serviceName,
      endpoint,
      headers,
    );
    return { id: reportId };
  }

  @Get(':id')
  async getReportStatus(@Param('id', ParseIntPipe) id: number) {
    const report = await this.reportService.getReportStatus(id);
    return report
      ? { status: report.status, download_link: report.download_link }
      : { error: 'Report not found' };
  }

  @Get('download/:filename')
  downloadReport(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = this.reportService.downloadReport(filename);
    response.contentType(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    return new StreamableFile(file);
  }
}
