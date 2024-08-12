const filesInDirectory = (dir: DirectoryEntry): Promise<File[]> => {
  return new Promise((resolve) => {
    const filePromise: Promise<File>[] = []
    dir.createReader().readEntries((entries) => {
      const entriesList = entries.filter((e) => e.name[0] !== '.')
      entriesList.forEach((e) =>
        e.isDirectory
          ? filesInDirectory(e as DirectoryEntry).then(resolve)
          : filePromise.push(
              new Promise((resolve) =>
                (e as FileEntry).file(resolve)
              ) as Promise<File>
            )
      )
    })
    Promise.all(filePromise).then((files) => resolve([...files]))
  })
}

const timestampForFilesInDirectory = (dir: DirectoryEntry) =>
  filesInDirectory(dir).then((files) =>
    files.map((f) => f.name + f.lastModified).join()
  )

const reload = () => {
  window.chrome.tabs.query(
    {
      active: true,
      currentWindow: false
    },
    (tabs) => {
      if (tabs[0]) {
        window.chrome.tabs.reload(tabs[0].id as number)
      }
      window.chrome.runtime.reload()
    }
  )
}

const watchChanges = (dir: DirectoryEntry, lastTimestamp?: string) => {
  timestampForFilesInDirectory(dir).then((timestamp) => {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000)
    } else {
      reload()
    }
  })
}

const hotReload = () => {
  chrome.management.getSelf((self) => {
    if (self.installType === 'development') {
      console.log(chrome)
      chrome.runtime.getPackageDirectoryEntry((dir: DirectoryEntry) =>
        watchChanges(dir)
      )
    }
  })
}

export { hotReload }
