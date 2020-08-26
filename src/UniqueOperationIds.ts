import _ from 'lodash';
import ucFirst from '@/ucFirst';
import lcFirst from '@/lcFirst';
import removeFileExtension from '@/removeFileExtension';
import { methods } from '@/constants/methods';

class UniqueOperationIds {
  getUniqueOperationIdFromPath (filePath: string, stripValue: string, tail = '', cwd?: string, removeMethod?: boolean): string {
    tail = tail || '';
    cwd = cwd || process.cwd();
    filePath = filePath.replace(cwd, '');
    filePath = removeFileExtension(filePath.replace(stripValue, ''));
    const filePathParts = filePath.split('/');
    for (let i = 0; i < filePathParts.length; ++i) {
      if (filePathParts[i] !== '/') {
        filePathParts[i] = ucFirst(_.camelCase(this.removeCurlys(filePathParts[i])));
      }
    }
    if (removeMethod) {
      if (methods.includes(filePathParts[filePathParts.length - 1].toLowerCase())) {
        filePathParts.pop();
      }
    }
    return lcFirst(filePathParts.join('')) + tail;
  }

  /**
   * Strings the path param curlies from a folder name
   */
  removeCurlys (input: string): string {
    return input.replace('{', '').replace('}', '');
  }
}

export default new UniqueOperationIds();
