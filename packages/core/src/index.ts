import { getProjectRootNamesAndCompilerOptions, getJsDocs } from 'ts-lib-utils'
import ts from 'typescript'

/**
 * @public
 */
export async function getSnapshot(project: string) {
  const { rootNames, compilerOptions } = await getProjectRootNamesAndCompilerOptions(project)
  const program = ts.createProgram(rootNames, compilerOptions)
  // const checker = program.getTypeChecker()
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.fileName.includes('node_modules')) {
      sourceFile.forEachChild((node) => {
        const jsDocs = getJsDocs(node)
        if (jsDocs.some((jsDoc) => jsDoc.name === 'api_snaptshot')) {
          console.info(node)
        }
      })
    }
  }
}
