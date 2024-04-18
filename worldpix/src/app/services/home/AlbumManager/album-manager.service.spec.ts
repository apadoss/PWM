import { TestBed } from '@angular/core/testing';

import { AlbumManagerService } from './album-manager.service';

describe('AlbumManagerService', () => {
  let service: AlbumManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
