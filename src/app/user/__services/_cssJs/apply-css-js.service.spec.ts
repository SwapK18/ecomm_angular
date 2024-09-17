import { TestBed } from '@angular/core/testing';

import { ApplyCssJsService } from './apply-css-js.service';

describe('ApplyCssJsService', () => {
  let service: ApplyCssJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyCssJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
