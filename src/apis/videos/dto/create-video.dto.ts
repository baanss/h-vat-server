import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({
    description: 'Index Code (Anonymize Code)',
    example: 'R0000313',
    required: true,
  })
  readonly indexCode: string;

  @ApiProperty({
    description: 'Video Path',
    example: '/ANT/R000001/ch1_video_01.mp4',
    uniqueItems: true,
    required: true,
  })
  readonly path: string;

  @ApiProperty({
    description: 'Total Frame of Video',
    example: 404243,
    required: true,
  })
  readonly totalFrame: number;

  @ApiProperty({
    description: 'Frame Rate',
    required: true,
  })
  readonly frameRate: number;

  @ApiProperty({
    description: 'Width of Video',
    example: 1280,
    required: true,
  })
  @ApiProperty({
    description: 'Height of Video',
    example: 1024,
    required: true,
  })
  readonly width: number;

  @ApiProperty({
    description: 'Height of Video',
    example: 1024,
    required: true,
  })
  readonly height: number;

  @ApiProperty({
    description: 'DataSet of Video',
  })
  readonly dataSet: string;
}
