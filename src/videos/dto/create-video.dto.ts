export class CreateVideoDto {
  readonly indexCode: string;
  readonly path: string;
  readonly totalFrame: number;
  readonly frameRate: number;
  readonly width: number;
  readonly height: number;
  readonly dataSet: string;
}
